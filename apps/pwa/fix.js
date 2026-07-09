const fs = require('fs');
const files = [
  'CrossRegionPage.tsx',
  'EmployabilityPage.tsx',
  'FormationsPage.tsx',
  'HistoryPage.tsx',
  'MentalHealthPage.tsx',
  'RegionsPage.tsx'
];
files.forEach(f => {
  const p = 'd:/GitHub AppBit/appbit-16/apps/pwa/src/pages/' + f;
  let code = fs.readFileSync(p, 'utf8');
  code = code.replace(/MapPin,\s*/g, '');
  code = code.replace(/ShieldAlert,\s*/g, '');
  code = code.replace(/Briefcase,\s*/g, '');
  code = code.replace(/GraduationCap,\s*/g, '');
  code = code.replace(/Menu,\s*/g, '');
  code = code.replace(/import \{ analyzeQuestion \} from "\.\.\/services\/api";\s*/g, '');
  code = code.replace(/const pergunta = textoInput;\s*/g, '');
  fs.writeFileSync(p, code);
});
