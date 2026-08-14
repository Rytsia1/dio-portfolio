@echo off
echo === File existence check ===
if exist "install-deps.bat" (echo install-deps.bat STILL EXISTS) else (echo install-deps.bat REMOVED)
if exist "install-deps.log" (echo install-deps.log STILL EXISTS) else (echo install-deps.log REMOVED)
if exist "nul" (echo nul STILL EXISTS) else (echo nul REMOVED)

echo.
echo === globals.css grid check ===
findstr /C:".bg-grid" "app\globals.css" >nul && (echo .bg-grid class: FOUND) || (echo .bg-grid class: MISSING)
findstr /C:".bg-pixel-grid" "app\globals.css" >nul && (echo .bg-pixel-grid class: FOUND) || (echo .bg-pixel-grid class: MISSING)

echo.
echo === project detail page hover check ===
findstr /C:"hover:bg-surface-soft" "app\projects\[slug]\page.tsx" >nul && (echo uses bg-surface-soft: YES) || (echo uses bg-surface-soft: NO)
findstr /C:"hover:bg-surface-hover" "app\projects\[slug]\page.tsx" >nul && (echo still uses bg-surface-hover: YES) || (echo still uses bg-surface-hover: NO)
