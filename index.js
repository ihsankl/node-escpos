const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');

const init = async() => {
    // Select the adapter based on your printer type
    // const device  = new escpos.Network('localhost');
    // const device  = new escpos.Serial('/dev/usb/lp0');
    
    // const options = { encoding: "GB18030" /* default */ }
    // encoding is optional
    
    // const printer = new escpos.Printer(device, options);
    try {
        const options = { encoding: "GB18030" /* default */ }
        // encoding is optional

        const device  = new escpos.USB(0x9C5, 0x589E);
        const printer = new escpos.Printer(device, options);
        device.open(function(error){
            if (error) {
                throw new Error(error);
            }
            printer
            .font('a')
            .align('ct')
            .style('bu')
            .size(1, 1)
            .text('The quick brown fox jumps over the lazy dog')
            .text('敏捷的棕色狐狸跳过懒狗')
            .barcode('1234567', 'EAN8')
            .table(["One", "Two", "Three"])
            .tableCustom(
              [
                { text:"Left", align:"LEFT", width:0.33, style: 'B' },
                { text:"Center", align:"CENTER", width:0.33},
                { text:"Right", align:"RIGHT", width:0.33 }
              ],
              { encoding: 'cp857', size: [1, 1] } // Optional
            )
            .cut()
            .close();
          });
          
    } catch (error) {
        console.error(error.message);
    }
}

init();
