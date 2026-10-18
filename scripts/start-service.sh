#!/bin/bash
echo "Starting ToolPulse background service..."
systemctl --user start toolpulse.service
sleep 1
systemctl --user status toolpulse.service --no-pager
