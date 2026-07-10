const fs = require('fs');
const path = require('path');
const files = ['RegionsPage.tsx', 'MentalHealthPage.tsx', 'HistoryPage.tsx', 'FormationsPage.tsx', 'EmployabilityPage.tsx', 'CrossRegionPage.tsx'];
files.forEach(file => {
  const p = path.join('d:\\GitHub AppBit\\appbit-16\\apps\\pwa\\src\\pages', file);
  if(fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/import \{ Topbar \} from "\.\.\/components\/Topbar";\r?\n?/g, '');
    content = content.replace(/import \{ MenuAppBit \} from "\.\.\/components\/MenuAppBit";\r?\n?/g, 'import { Navbar } from "../components/Navbar";\n');
    content = content.replace(/<MenuAppBit \/>/g, '');
    content = content.replace(/<Topbar[\s\S]*?\/>/g, '<Navbar />');
    fs.writeFileSync(p, content, 'utf8');
  }
});
console.log('Fixed imports in 6 files');
