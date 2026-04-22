// Landing page screenshots for psychology/therapist websites
export interface SitePreview {
    src: string;
    label: string;
    style: string;  // short descriptor of the aesthetic
    mood: string;   // 1-2 words describing the vibe
}

export const SITE_PREVIEWS: SitePreview[] = [
    {
        src: '/lp-psicologia/suave_brasileira.jpg',
        label: 'Psicologia Brasileira',
        style: 'Suave e acolhedora',
        mood: 'Acolhedor',
    },
    {
        src: '/lp-psicologia/lavanda.jpg',
        label: 'Psicologia Lavanda',
        style: 'Tons suaves e orgânicos',
        mood: 'Calmo',
    },
    {
        src: '/lp-psicologia/azul_inovador.jpg',
        label: 'Psicologia Inovadora',
        style: 'Azul contemporâneo',
        mood: 'Moderno',
    },
    {
        src: '/lp-psicologia/infantil.jpg',
        label: 'Psicologia Infantil',
        style: 'Lúdica e acolhedora',
        mood: 'Infantil',
    },
    {
        src: '/lp-psicologia/autismo.jpg',
        label: 'Terapia TEA',
        style: 'Estrutura clara e sensorial',
        mood: 'Clareza',
    },
    {
        src: '/lp-psicologia/laranja.jpg',
        label: 'Psicologia Terracota',
        style: 'Tons quentes e terrosos',
        mood: 'Caloroso',
    },
    {
        src: '/lp-psicologia/pop_design.jpg',
        label: 'Psicologia Pop',
        style: 'Design jovem e direto',
        mood: 'Vibrante',
    },
];

// The hero's feature screenshot (first slot — the most Candeia-aligned)
export const HERO_PREVIEW = SITE_PREVIEWS[0];
