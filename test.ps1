Write-Host "1. Testing health endpoint..."
$health = Invoke-WebRequest -Uri "http://localhost:3000/health" -UseBasicParsing
Write-Host "Health status: $($health.StatusCode) $($health.StatusDescription)"
Write-Host "Response: $($health.Content)"

Write-Host "`n2. Creating short URL..."
$body = @{ longUrl = "https://www.youtube.com" } | ConvertTo-Json
$headers = @{
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/shorten" -Method Post -Body $body -Headers $headers -UseBasicParsing
    Write-Host "Status: $($response.StatusCode) $($response.StatusDescription)"
    $responseData = $response.Content | ConvertFrom-Json
    Write-Host "Response: $($responseData | ConvertTo-Json -Depth 5)"
    
    $shortUrl = $responseData.shortUrl
    $urlCode = $responseData.urlCode
    
    Write-Host "`n3. Testing redirection for: $shortUrl"
    $redirect = Invoke-WebRequest -Uri $shortUrl -Method Get -MaximumRedirection 0 -ErrorAction SilentlyContinue -UseBasicParsing
    
    if ($redirect.StatusCode -eq 302) {
        Write-Host "Redirection successful!"
        Write-Host "Redirects to: $($redirect.Headers.Location)"
    } else {
        Write-Host "Unexpected status code: $($redirect.StatusCode)"
        Write-Host "Response: $($redirect.Content)"
    }
    
} catch {
    Write-Host "Error: $_"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response body: $responseBody"
    }
}
