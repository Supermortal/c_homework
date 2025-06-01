#!/bin/bash
set -e

# Wait for SQL Server to be available
until /opt/mssql-tools18/bin/sqlcmd -S db -U sa -P Your_password123 -Q "SELECT 1" -C &> /dev/null
do
  echo "Waiting for SQL Server..."
  sleep 2
done

# Start the app
exec dotnet TodoApi.dll