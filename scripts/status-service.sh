#!/bin/bash
echo "=== ToolPulse Background Service Status ==="
systemctl --user status toolpulse.service --no-pager
echo ""
echo "=== Port 5173 Check ==="
curl -s -o /dev/null -w "HTTP Response Code: %{http_code}\n" http://localhost:5173/
