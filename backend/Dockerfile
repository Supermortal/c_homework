FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# --- Final stage ---
FROM base AS final
WORKDIR /app

# Install mssql-tools in the final image
RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg && \
    mkdir -p /etc/apt/sources.list.d && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 unixodbc-dev && \
    ln -sfn /opt/mssql-tools18/bin/sqlcmd /usr/bin/sqlcmd

COPY --from=build /app/publish .
COPY entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]