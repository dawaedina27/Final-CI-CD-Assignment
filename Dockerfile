# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (for caching)
COPY package*.json ./

# Install all dependencies (including devDependencies if needed)
RUN npm ci

# ── Stage 2: Production image ─────────────────────────────────────────────────
FROM node:20-alpine AS production

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application source files
COPY app.js ./
COPY main.js ./
COPY public/ ./public/

# Set proper ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 4000

# Healthcheck to ensure app is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/ || exit 1

# Environment variables
ENV NODE_ENV=production \
    PORT=4000

# Start the application (use main entry point)
CMD ["node", "main.js"]