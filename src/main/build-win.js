// eslint-disable-next-line import/no-extraneous-dependencies
import * as builder from 'electron-builder';

builder.build({
    config: {
        'appId': 'fogrex.mini-game',
        'win':{
            'target': {
                'target': 'zip',
                'arch': [
                    'x64',
                    'ia32',
                ]
            }
        }
    }
});