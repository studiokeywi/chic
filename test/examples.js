import chic from '@studiokeywi/chic';

const blueBorder = '0.125rem solid blue';
const oneRem = '1rem';
const quoteExample = '"Fira Code", monospace';

// tagged template logging #1
chic.log`Hello World`;
// tagged template logging #2
chic.log`Hello World${chic.background.darkslategray.color.lightgray()}`;
chic.log`Hello${chic.color.red()} World${chic.color.blue()}`;
// tagged template logging #3
chic.log`Hello${chic['font-size'][oneRem]()} World`;
// tagged template logging #4
const someUsername = 'Gary Garrison';
chic.log(['User: ', someUsername], chic.fontWeight.bolder.padding[oneRem](), chic.color.yellow());

// css builder #1
chic.background['#c0c0c0']['border-radius']['0.5rem'].border[blueBorder]();
// css builder #2
chic.background.$c0c0c0.borderRadius._0_5rem.border._0_125rem_solid_blue();
// css builder #3
chic.color.$C0C0C0();
chic.color.$c0c0c0();
chic.fontFamily[quoteExample]();
// css builder #4
const infoStyle1 = chic.background.$c0c0c0.color.white();
const infoBox1 = `${infoStyle1};${chic.padding[oneRem].border[blueBorder]()}`;
chic.log`Something to know 1${infoBox1}`;
// css builder #5
const infoStyle2 = chic.background.$c0c0c0.color.white.fix();
const infoBox2 = infoStyle2.padding[oneRem].border[blueBorder]();
chic.log`Something to know 2${infoBox2}`;
// css bulder #6
const infoBox3 = infoStyle2.padding[oneRem].border[blueBorder].fix();
infoBox3.log`Something to know 3${infoBox3()}`;
