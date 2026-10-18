#!/bin/bash
echo "Restarting ToolPulse background service..."
systemctl --user restart toolpulse.service
sleep 1
systemctl --user status toolpulse.service --no-pager
