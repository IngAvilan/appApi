import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'appAPI',
  webDir: 'www'
};

server: {
  allowNavigation: ['cdn.imagin.studio', 'placehold.co']
}

export default config;
