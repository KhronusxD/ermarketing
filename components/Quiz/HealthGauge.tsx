import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeDatum {
    name: string;
    value: number;
    color: string;
}

interface HealthGaugeProps {
    data: GaugeDatum[];
}

// Isolated so the recharts bundle (~300KB) is only fetched on the legacy
// /auditoria-de-lucro-invisivel results screen, not bundled into the rest of
// the Quiz chunk.
const HealthGauge: React.FC<HealthGaugeProps> = ({ data }) => (
    <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
    </ResponsiveContainer>
);

export default HealthGauge;
