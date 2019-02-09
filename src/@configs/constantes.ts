import { FuseConfig } from '@fuse/types';

export const CrmConst = {
    sysName: 'Cotizaciones Jumbo',
    vtigerUrl: 'http://jumbo.ltncrm.com', // 'http://jumbo.ltncrm.com' 'http://colombiacrm.ltnxmart.com/' 'http://192.168.182.130'
    logoDir: 'assets/images/jumbo/logo/LOGO_JUMBO.jpg',
    loginDir: '/pages/auth/jumbologin',
    homeDir: ''
};

export const BackEndConst = {
    backEndUrlxx: 'http://127.0.0.1:3000',
    backEndUrl: 'http://157.230.134.208:3000', // 'http://157.230.134.208:3000', http://127.0.0.1:3000
    endPoints: {
        usuarios: '/jumboApi/usuarios',
        servicios: '/jumboApi/servicios',
        penalidades: '/jumboApi/penalidades',
        habitaciones: '/jumboApi/habitaciones',
        hoteles: '/jumboApi/hoteles',
        docs: '/jumboApi/docs'
    }
};


export const customfuseConfig: FuseConfig = {
    colorTheme      : 'theme-default',
    customScrollbars: true,
    layout          : {
        style    : 'vertical-layout-1',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'indigo-900',
            secondaryBackground: 'indigo-600',
            folded             : false,
            hidden             : false,
            position           : 'left',
            variant            : 'vertical-style-2'
        },
        toolbar  : {
            customBackgroundColor: true,
            background: 'yellow-500',
            hidden    : false,
            position  : 'below-static'
        },
        footer   : {
            customBackgroundColor: true,
            background           : 'fuse-navy-900',
            hidden               : true,
            position             : 'below-fixed'
        },
        sidepanel: {
            hidden  : true,
            position: 'right'
        }
    }
};

