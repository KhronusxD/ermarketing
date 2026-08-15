import React, { useState } from 'react';
import { LeadData } from './types';

interface LeadFormProps {
    onSubmit: (data: LeadData) => void;
    isSubmitting?: boolean;
}

// Light editorial form aligned with the rest of the funnel. Five fields,
// no decorative noise — just labelled inputs with a hairline border that
// turns red on focus.
const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isSubmitting }) => {
    const [data, setData] = useState<LeadData>({
        name: '',
        company: '',
        whatsapp: '',
        email: '',
        instagram: '',
    });

    const setField =
        (key: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold">
                        Último passo
                    </span>
                </div>
                <div className="h-[3px] bg-[#8DC63F]" />
            </div>

            <main className="flex-1">
                <div className="max-w-[900px] mx-auto px-6 py-12 md:py-20 grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-5">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-[#3d6b12] font-bold mb-6">
                            ◆ Identificação
                        </p>
                        <h2
                            className="font-norte font-medium leading-[0.95] tracking-[-0.055em] mb-6"
                            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
                        >
                            Diagnóstico
                            <br />
                            <span className="text-[#3d6b12]">pronto.</span>
                        </h2>
                        <p className="text-base text-[#131313]/70 leading-relaxed">
                            Preencha seus dados pra liberar o agendamento da call de
                            15 minutos com o nosso time.
                        </p>
                    </div>

                    <form
                        onSubmit={onFormSubmit}
                        className="col-span-12 md:col-span-7 space-y-5"
                    >
                        <Field
                            label="Nome completo"
                            name="name"
                            value={data.name}
                            onChange={setField('name')}
                            placeholder="Como devemos te chamar"
                            required
                        />
                        <Field
                            label="Empresa"
                            name="company"
                            value={data.company}
                            onChange={setField('company')}
                            placeholder="Nome do negócio"
                            required
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Field
                                label="WhatsApp"
                                name="whatsapp"
                                type="tel"
                                value={data.whatsapp}
                                onChange={setField('whatsapp')}
                                placeholder="(11) 99999-9999"
                                required
                            />
                            <Field
                                label="E-mail"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={setField('email')}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                        <Field
                            label="Instagram (opcional)"
                            name="instagram"
                            value={data.instagram ?? ''}
                            onChange={setField('instagram')}
                            placeholder="@seuperfil"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto mt-6 disabled:bg-black/15 disabled:text-black/35 disabled:cursor-not-allowed group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#8DC63F] hover:bg-[#9ed650] text-[#0B0E0C] font-semibold text-sm md:text-base px-8 py-4 transition-colors"
                        >
                            {isSubmitting
                                ? 'Processando…'
                                : 'Continuar para agendamento'}
                            {!isSubmitting && (
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            )}
                        </button>

                        <p className="text-xs text-[#131313]/45 leading-relaxed">
                            Seus dados ficam só com a ER. Nunca enviamos spam — usamos
                            apenas pra confirmar o horário da call.
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
};

interface FieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}

const Field: React.FC<FieldProps> = ({
    label,
    name,
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
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full rounded-xl bg-white border border-black/15 px-4 py-3.5 text-base text-[#131313] placeholder-black/35 focus:outline-none focus:border-[#8DC63F] focus:ring-1 focus:ring-[#8DC63F] transition-colors"
        />
    </label>
);

export default LeadForm;
