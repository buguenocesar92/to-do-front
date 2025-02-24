import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  // Configuración para los archivos a lintar
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,js,jsx,vue}'], // Incluye archivos TS, JS y Vue
  },

  // Configuración para los archivos a ignorar
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**', // Ignorar dependencias
    ],
  },

  // Configuración básica de Vue
  ...pluginVue.configs['flat/essential'],

  // Configuración de TypeScript para Vue
  ...vueTsEslintConfig(),

  // Configuración para Vitest
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  // Configuración de Prettier para omitir formato
  skipFormatting,

  // Reglas adicionales para <script> y nombres de componentes
  {
    files: ['**/*.vue'],
    rules: {
      // Requiere que los bloques <script> especifiquen lang (ts o js)
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: ['ts', 'js'], // Permitir TypeScript y JavaScript en <script lang="">
          },
        },
      ],
      // Permitir nombres de componentes de una sola palabra
      'vue/multi-word-component-names': 'off',
      // Desactivar la regla vue/valid-v-slot de forma global
      'vue/valid-v-slot': 'off',
    },
  },
];
