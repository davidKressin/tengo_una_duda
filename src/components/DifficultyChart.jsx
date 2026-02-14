import React from 'react';

export const DifficultyChart = () => {
    // Generate points for an exponential curve
    // y = a * e^(bx)
    const points = [];
    const width = 100;
    const height = 100;
    const padding = 10;

    for (let x = 0; x <= width; x += 1) {
        // We want the curve to start slow and go up fast
        // Normalize x from 0 to 1
        const t = x / width;
        const y = Math.pow(t, 4) * height; // x^4 for a steep curve at the end
        points.push(`${x},${height - y}`);
    }

    const pathData = `M 0,${height} ${points.map(p => `L ${p}`).join(' ')}`;

    return (
        <div className="difficulty-chart-container position-relative w-100" style={{ height: '300px' }}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                className="w-100 h-100 overflow-visible"
            >
                {/* Grids */}
                {[0, 25, 50, 75, 100].map(v => (
                    <React.Fragment key={v}>
                        <line x1="0" y1={v} x2={width} y2={v} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        <line x1={v} y1="0" x2={v} y2={height} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    </React.Fragment>
                ))}

                {/* The Curve */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="curve-animation"
                />

                {/* Glow for the curve */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ opacity: 0.2, filter: 'blur(4px)' }}
                />

                {/* Area under the curve */}
                <path
                    d={`${pathData} L ${width},${height} L 0,${height} Z`}
                    fill="url(#area-gradient)"
                    style={{ opacity: 0.1 }}
                />

                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--secondary)" />
                    </linearGradient>
                    <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Labels */}
            <div className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-between px-2 text-white opacity-50 small" style={{ transform: 'translateY(25px)' }}>
                <span>Bajo Puntaje</span>
                <span>Puntaje Alto (800+)</span>
            </div>
            <div className="position-absolute top-0 start-0 h-100 d-flex flex-column justify-content-between py-2 text-white opacity-50 small" style={{ transform: 'translateX(-40px)', writingMode: 'vertical-rl' }}>
                <span>Máxima Dificultad</span>
                <span>Baja Dificultad</span>
            </div>

            <style>{`
                .curve-animation {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: dash 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes dash {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
        </div>
    );
};
