# CV MAN - Build Executable Script
Write-Host "Building CV MAN executable..." -ForegroundColor Green

# Build the application
Write-Host "Building React application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "React build failed!" -ForegroundColor Red
    exit 1
}

# Build Tauri executable
Write-Host "Building Tauri executable..." -ForegroundColor Yellow
npm run tauri:build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    Write-Host "Your executable is located in: src-tauri\target\release\" -ForegroundColor Cyan
    Write-Host "Look for: CV Man.exe" -ForegroundColor Cyan
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}