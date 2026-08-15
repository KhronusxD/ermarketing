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
        <div className="min-h-screen bg-white text-[#131313] flex flex-col">
            <div className="border-b border-black/10">
                <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#131313]/60 hover:text-[#131313]"
                    >
                        <img
                            src="/norte/logo-preta.png"
                            alt="Norte · Agência de Marketing"
                            className="h-7 w-auto object-contain"
                        />
                    </a>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#131313]/55">
                        Análise concluída
                    </span>
                </div>
            </div>

            <main className="flex-1 flex items-center">
                <div className="max-w-[1100px] mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-7">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold mb-6">
                            ◆ Sinceridade direta
                        </p>
                        <h2
                            className="font-norte font-medium leading-[0.92] tracking-[-0.055em] mb-8 max-w-2xl"
                            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)' }}
                        >
                            O 1:1 com nosso
                            <br />
                            time ainda não é
                            <br />
                            <span className="text-[#3d6b12]">o seu momento</span>.
                        </h2>

                        <div className="space-y-5 text-base md:text-lg text-[#131313]/75 leading-relaxed max-w-2xl">
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
                        className="col-span-12 md:col-span-5 rounded-[22px] bg-white border border-black/[0.08] p-6 md:p-8 space-y-5 self-start"
                    >
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold mb-2">
                            ◆ Lista prioritária
                        </p>
                        <h3 className="font-norte font-medium text-2xl leading-[1] tracking-[-0.055em] mb-4">
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
                            className="w-full mt-2 disabled:bg-black/15 disabled:text-black/35 disabled:cursor-not-allowed group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm md:text-base px-8 py-4 transition-colors"
                        >
                            {isSubmitting
                                ? 'Salvando…'
                                : 'Entrar na lista'}
                        </button>

                        <p className="text-xs text-[#131313]/55 leading-relaxed">
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
        <span className="block text-[10px] tracking-[0.25em] uppercase text-[#131313]/60 mb-2">
            {label}
            {required && <span className="text-[#3d6b12]"> *</span>}
        </span>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full rounded-xl bg-white border border-black/15 px-4 py-3 text-base text-[#131313] placeholder-black/35 focus:outline-none focus:border-[#8DC63F] focus:ring-1 focus:ring-[#8DC63F] transition-colors"
        />
    </label>
);

export const WaitlistThanks: React.FC = () => (
    <div className="min-h-screen bg-white text-[#131313] flex flex-col">
        <div className="border-b border-black/10">
            <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
                <a
                    href="/"
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#131313]/60 hover:text-[#131313]"
                >
                    <img
                        src="/norte/logo-preta.png"
                        alt="Norte · Agência de Marketing"
                        className="h-7 w-auto object-contain"
                    />
                </a>
            </div>
        </div>
        <main className="flex-1 flex items-center">
            <div className="max-w-[900px] mx-auto px-6 py-20 text-center">
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold mb-6">
                    ◆ Confirmado
                </p>
                <h2
                    className="font-norte font-medium leading-[0.95] tracking-[-0.055em] mb-6"
                    style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
                >
                    Você está
                    <br />
                    <span className="text-[#3d6b12]">na lista</span>.
                </h2>
                <p className="text-base md:text-lg text-[#131313]/70 leading-relaxed max-w-2xl mx-auto">
                    Assim que a nova frente abrir, você recebe um aviso direto no
                    WhatsApp. Enquanto isso, segue o trabalho — o seu turno chega.
                </p>
                <a
                    href="/"
                    className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#131313]/60 hover:text-[#131313]"
                >
                    ← Voltar pro site
                </a>
            </div>
        </main>
    </div>
);

export default NurtureWaitlist;
