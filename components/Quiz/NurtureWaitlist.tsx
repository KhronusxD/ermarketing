import React, { useState } from 'react';
import { WaitlistData } from './types';

interface NurtureWaitlistProps {
    onSubmit: (data: WaitlistData) => void;
    isSubmitting?: boolean;
}

// Shown to leads that don't fit the current 1:1 model (early stage,
// low revenue, no urgency). Instead of burning the team's calendar on
// a call that won't close, we capture them for the upcoming lower-ticket
// product (essencial track — still in production).
const NurtureWaitlist: React.FC<NurtureWaitlistProps> = ({
    onSubmit,
    isSubmitting,
}) => {
    const [data, setData] = useState<WaitlistData>({
        name: '',
        email: '',
        whatsapp: '',
    });

    const setField =
        (key: keyof WaitlistData) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setData((prev) => ({ ...prev, [key]: e.target.value }));

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        onSubmit(data);
    };

    return (
        <div className="min-h-screen bg-er-paper text-er-ink flex flex-col">
            <div className="border-b border-er-ink/10">
                <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-er-ink/60 hover:text-er-ink"
                    >
                        <img
                            src="/assets/red-logo.png"
                            alt="ER Marketing"
                            className="h-6 w-auto"
                        />
                        ER Marketing
                    </a>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-er-ink/55">
                        Análise concluída
                    </span>
                </div>
            </div>

            <main className="flex-1 flex items-center">
                <div className="max-w-[1100px] mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-7">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                            ◆ Sinceridade direta
                        </p>
                        <h2
                            className="font-display uppercase leading-[0.92] tracking-tight mb-8 max-w-2xl"
                            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)' }}
                        >
                            O 1:1 com nosso
                            <br />
                            time ainda não é
                            <br />
                            <span className="text-er-red">o seu momento</span>.
                        </h2>

                        <div className="space-y-5 text-base md:text-lg text-er-ink/75 leading-relaxed max-w-2xl">
                            <p>
                                Nossa operação principal é desenhada pra empresas que
                                já investem em marketing ou estão prontas pra começar
                                com volume — e a gente prefere ser honesto a vender o
                                que não vai te servir agora.
                            </p>
                            <p>
                                Mas estamos preparando uma <strong>oferta enxuta</strong>{' '}
                                pra negócios no seu estágio. Algo mais acessível,
                                desenhado pra quem está construindo a primeira máquina
                                de aquisição.
                            </p>
                            <p>
                                Deixa seu contato aqui e <strong>você é o primeiro</strong>{' '}
                                a saber quando essa frente abrir.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={onFormSubmit}
                        className="col-span-12 md:col-span-5 bg-white border border-er-ink/15 p-6 md:p-8 space-y-5 self-start"
                    >
                        <p className="text-[10px] tracking-[0.3em] uppercase text-er-red font-bold mb-2">
                            ◆ Lista prioritária
                        </p>
                        <h3 className="font-display uppercase text-2xl leading-[1] tracking-tight mb-4">
                            Quero ser avisado primeiro.
                        </h3>

                        <Field
                            label="Nome"
                            value={data.name}
                            onChange={setField('name')}
                            placeholder="Como devemos te chamar"
                            required
                        />
                        <Field
                            label="WhatsApp"
                            type="tel"
                            value={data.whatsapp}
                            onChange={setField('whatsapp')}
                            placeholder="(11) 99999-9999"
                            required
                        />
                        <Field
                            label="E-mail"
                            type="email"
                            value={data.email}
                            onChange={setField('email')}
                            placeholder="seu@email.com"
                            required
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center gap-3 bg-er-ink text-er-paper hover:bg-er-red disabled:bg-er-ink/40 disabled:cursor-not-allowed transition-colors font-bold tracking-[0.18em] uppercase text-sm px-7 py-4 mt-2"
                        >
                            {isSubmitting
                                ? 'Salvando…'
                                : 'Entrar na lista'}
                        </button>

                        <p className="text-xs text-er-ink/55 leading-relaxed">
                            Sem spam. Apenas o aviso quando a nova frente abrir +
                            conteúdo eventual de valor.
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

interface FieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}

const Field: React.FC<FieldProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    required,
}) => (
    <label className="block">
        <span className="block text-[10px] tracking-[0.25em] uppercase text-er-ink/60 mb-2">
            {label}
            {required && <span className="text-er-red"> *</span>}
        </span>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full bg-er-paper border border-er-ink/20 px-4 py-3 text-base text-er-ink placeholder-er-ink/35 focus:outline-none focus:border-er-red focus:ring-1 focus:ring-er-red transition-colors"
        />
    </label>
);

export const WaitlistThanks: React.FC = () => (
    <div className="min-h-screen bg-er-paper text-er-ink flex flex-col">
        <div className="border-b border-er-ink/10">
            <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
                <a
                    href="/"
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-er-ink/60 hover:text-er-ink"
                >
                    <img
                        src="/assets/red-logo.png"
                        alt="ER Marketing"
                        className="h-6 w-auto"
                    />
                    ER Marketing
                </a>
            </div>
        </div>
        <main className="flex-1 flex items-center">
            <div className="max-w-[900px] mx-auto px-6 py-20 text-center">
                <p className="text-[11px] tracking-[0.3em] uppercase text-er-red font-bold mb-6">
                    ◆ Confirmado
                </p>
                <h2
                    className="font-display uppercase leading-[0.95] tracking-tight mb-6"
                    style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
                >
                    Você está
                    <br />
                    <span className="text-er-red">na lista</span>.
                </h2>
                <p className="text-base md:text-lg text-er-ink/70 leading-relaxed max-w-2xl mx-auto">
                    Assim que a nova frente abrir, você recebe um aviso direto no
                    WhatsApp. Enquanto isso, segue o trabalho — o seu turno chega.
                </p>
                <a
                    href="/"
                    className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-er-ink/60 hover:text-er-ink"
                >
                    ← Voltar pro site
                </a>
            </div>
        </main>
    </div>
);

export default NurtureWaitlist;
