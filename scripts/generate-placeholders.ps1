param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\public\images")
)

Add-Type -AssemblyName System.Drawing

$resolvedOutput = [System.IO.Path]::GetFullPath($OutputDirectory)
[System.IO.Directory]::CreateDirectory($resolvedOutput) | Out-Null

function New-BrushColor {
  param([string]$Hex, [int]$Alpha = 255)

  $clean = $Hex.TrimStart("#")
  $red = [Convert]::ToInt32($clean.Substring(0, 2), 16)
  $green = [Convert]::ToInt32($clean.Substring(2, 2), 16)
  $blue = [Convert]::ToInt32($clean.Substring(4, 2), 16)
  return [System.Drawing.Color]::FromArgb($Alpha, $red, $green, $blue)
}

function New-PlaceholderImage {
  param(
    [string]$FileName,
    [string]$Label,
    [int]$Variant,
    [int]$Width = 1600,
    [int]$Height = 1000
  )

  $bitmap = [System.Drawing.Bitmap]::new($Width, $Height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $navy = New-BrushColor "#062f5f"
  $navyLight = New-BrushColor "#15558c"
  $gold = New-BrushColor "#f5c518"
  $red = New-BrushColor "#d9272e"
  $warm = New-BrushColor "#f3eee5"
  $ink = New-BrushColor "#15253a"

  $backgroundPairs = @(
    @($navy, $ink),
    @($warm, $navyLight),
    @($navyLight, $navy),
    @($ink, $navyLight),
    @($warm, $ink)
  )
  $pair = $backgroundPairs[$Variant % $backgroundPairs.Count]
  $background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(0, 0, $Width, $Height),
    $pair[0],
    $pair[1],
    [single](18 + (($Variant * 23) % 112))
  )
  $graphics.FillRectangle($background, 0, 0, $Width, $Height)

  $scale = [Math]::Min($Width, $Height)
  $goldWash = [System.Drawing.SolidBrush]::new((New-BrushColor "#f5c518" 52))
  $redWash = [System.Drawing.SolidBrush]::new((New-BrushColor "#d9272e" 42))
  $whiteWash = [System.Drawing.SolidBrush]::new((New-BrushColor "#ffffff" 28))
  $deepWash = [System.Drawing.SolidBrush]::new((New-BrushColor "#031d3c" 88))

  $graphics.FillEllipse(
    $goldWash,
    [int]($Width * (0.58 - (($Variant % 3) * 0.08))),
    [int](-$Height * 0.34),
    [int]($scale * 1.16),
    [int]($scale * 1.16)
  )
  $graphics.FillEllipse(
    $redWash,
    [int](-$Width * 0.12),
    [int]($Height * (0.56 - (($Variant % 2) * 0.12))),
    [int]($scale * 0.78),
    [int]($scale * 0.78)
  )

  $stripeWidth = [int]($Width * 0.16)
  $stripeX = [int]($Width * (0.68 - (($Variant % 4) * 0.07)))
  $graphics.TranslateTransform($Width / 2, $Height / 2)
  $graphics.RotateTransform([single](-22 + (($Variant % 3) * 9)))
  $graphics.FillRectangle(
    $whiteWash,
    [int](-$Width),
    [int](-$stripeWidth / 2),
    [int]($Width * 2),
    $stripeWidth
  )
  $graphics.FillRectangle(
    $deepWash,
    [int](-$Width),
    [int]($stripeWidth * 0.66),
    [int]($Width * 2),
    [int]($stripeWidth * 0.28)
  )
  $graphics.ResetTransform()

  $linePen = [System.Drawing.Pen]::new((New-BrushColor "#ffffff" 34), [single]2)
  $lineGap = [Math]::Max(54, [int]($scale * 0.09))
  for ($line = -$Height; $line -lt ($Width + $Height); $line += $lineGap) {
    $graphics.DrawLine($linePen, $line, 0, $line - $Height, $Height)
  }

  $smallFont = [System.Drawing.Font]::new("Arial", [single]([Math]::Max(12, $scale * 0.016)), [System.Drawing.FontStyle]::Bold)
  $markFont = [System.Drawing.Font]::new("Georgia", [single]([Math]::Max(72, $scale * 0.12)), [System.Drawing.FontStyle]::Bold)
  $labelBrush = [System.Drawing.SolidBrush]::new((New-BrushColor "#ffffff" 214))
  $markBrush = [System.Drawing.SolidBrush]::new((New-BrushColor "#ffffff" 34))
  $tagBrush = [System.Drawing.SolidBrush]::new((New-BrushColor "#031d3c" 184))

  $graphics.DrawString("SLNA", $markFont, $markBrush, [single]($Width * 0.055), [single]($Height * 0.07))

  $tagText = "PHOTOGRAPHY PLACEHOLDER  /  $Label"
  $tagSize = $graphics.MeasureString($tagText, $smallFont)
  $tagX = [single]($Width * 0.055)
  $tagY = [single]($Height - $tagSize.Height - ($Height * 0.06))
  $tagPaddingX = [single]18
  $tagPaddingY = [single]11
  $graphics.FillRectangle(
    $tagBrush,
    $tagX - $tagPaddingX,
    $tagY - $tagPaddingY,
    $tagSize.Width + ($tagPaddingX * 2),
    $tagSize.Height + ($tagPaddingY * 2)
  )
  $graphics.DrawString($tagText, $smallFont, $labelBrush, $tagX, $tagY)

  $outputPath = Join-Path $resolvedOutput $FileName
  $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } |
    Select-Object -First 1
  $encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $qualityParameter = [System.Drawing.Imaging.EncoderParameter]::new(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]90
  )
  $encoderParameters.Param[0] = $qualityParameter
  $bitmap.Save($outputPath, $jpegCodec, $encoderParameters)

  $qualityParameter.Dispose()
  $encoderParameters.Dispose()
  $smallFont.Dispose()
  $markFont.Dispose()
  $labelBrush.Dispose()
  $markBrush.Dispose()
  $tagBrush.Dispose()
  $linePen.Dispose()
  $goldWash.Dispose()
  $redWash.Dispose()
  $whiteWash.Dispose()
  $deepWash.Dispose()
  $background.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

$placeholders = @(
  @{ Name = "hero-campus.jpg"; Label = "HERO CAMPUS"; Variant = 0 },
  @{ Name = "campus-introduction.jpg"; Label = "CAMPUS / LEARNERS"; Variant = 1 },
  @{ Name = "early-years.jpg"; Label = "EARLY YEARS"; Variant = 2 },
  @{ Name = "junior-school.jpg"; Label = "JUNIOR SCHOOL"; Variant = 3 },
  @{ Name = "senior-school.jpg"; Label = "SENIOR SCHOOL"; Variant = 4 },
  @{ Name = "a-level.jpg"; Label = "A-LEVEL"; Variant = 5 },
  @{ Name = "school-life.jpg"; Label = "SCHOOL LIFE"; Variant = 6 },
  @{ Name = "gallery-01.jpg"; Label = "GALLERY 01"; Variant = 7 },
  @{ Name = "gallery-02.jpg"; Label = "GALLERY 02"; Variant = 8 },
  @{ Name = "gallery-03.jpg"; Label = "GALLERY 03"; Variant = 9 },
  @{ Name = "gallery-04.jpg"; Label = "GALLERY 04"; Variant = 10 },
  @{ Name = "gallery-05.jpg"; Label = "GALLERY 05"; Variant = 11 },
  @{ Name = "gallery-06.jpg"; Label = "GALLERY 06"; Variant = 12 }
)

foreach ($placeholder in $placeholders) {
  New-PlaceholderImage `
    -FileName $placeholder.Name `
    -Label $placeholder.Label `
    -Variant $placeholder.Variant
}

New-PlaceholderImage `
  -FileName "chairman-portrait.jpg" `
  -Label "OFFICIAL CHAIRMAN PORTRAIT" `
  -Variant 13 `
  -Width 900 `
  -Height 1200

Write-Output "Created $($placeholders.Count + 1) placeholders in $resolvedOutput"
