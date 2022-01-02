//Genera il file PDF usando la libreria jsPDF
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format, parseISO } from 'date-fns';
import { Client } from '../components/ClientList';

interface Item {
    unique_id: string;
    itemId: string;
    itemDescription: string;
    umi: string;
    umv: string;
    qtyi: number;
    qtyv: number;
    price: number;
    um: string;
    total: number;
    notes: string;
}

interface Column {
    title: string;
    key: string;
}[]

const createPDF = (client: Client, cart: Item[]) => {



    let columns: Column[] = [];
    let options: object = {};
    let height: number = 180;
    let splitText: string = "";
    let noteHeight: number = 0;
    let today = (new Date).toISOString();


    //FIRST GENERATE THE PDF DOCUMENT
    console.log("generating pdf...");
    let doc = new jsPDF('p', 'pt', 'a4');

    doc.setFontSize(20);
    //doc.setFontType("bold");
    doc.text('Sidercampania Professional srl', 20, 50);

    doc.setFontSize(12);
    //doc.setFontType("normal");
    doc.text('Offerta commerciale', 20, 65);
    doc.text('Data emissione: ' + format(parseISO(today), "dd-MM-yyyy"), 400, 65,);

    doc.setFontSize(10);
    doc.text('Spett.le: ' + client.ragSociale, 20, 80);
    doc.text(client.indirizzo, 20, 95);
    doc.text(client.indirizziAlt, 20, 110);

    options = {
        padding: 3, // Vertical cell padding
        fontSize: 10,
        lineHeight: 15,
        /*renderCell: function (x, y, w, h, txt, fillColor, options) {
            doc.setFillColor.apply(this, fillColor);
            doc.rect(x, y, w, h, 'F');
            doc.text(txt, x + options.padding, y + doc.internal.getLineHeight());
        },*/
        margins: { horizontal: 20, top: 130, bottom: 40 }, // How much space around the table
        extendWidth: true // If true, the table will span 100% of page width minus horizontal margins.
    };

    columns = [
        { title: "Codice", key: "codice" },
        { title: "Descrizione", key: "descrizione" },
        { title: "Note", key: "nota" },
        { title: "Qta V", key: "qtav" },
        { title: "Qta I", key: "qta" },
        { title: "Prezzo", key: "prezzo" },
        { title: "Totale", key: "totale" }
    ];

    let tableData: any = [];

    cart.map(item => tableData.push(
        item.itemId,
        item.itemDescription,item.notes,
        item.qtyv.toString().replace(/\./g, ",") + ' ' + item.umv,
        item.qtyi.toString().replace(/\./g, ",") + ' ' + item.umi,
        item.price.toString().replace(/\./g, ","),
        item.total.toFixed(2).replace(/\./g, ",")
    ));

    autoTable(doc, {
        head: [columns],
        body: [tableData]
    });
    //doc.autoTable(columns, tableData, options);
    //height = doc.drawTable(tableData, {xstart:15,ystart:20,tablestart:50,marginleft:50, xOffset:5, yOffset:5});

    //doc.setFontType("bolditalic");
    doc.setFontSize(12);
    doc.text(400, height, 'Totale offerta: ' + offertaHeader.totaleOfferta.toFixed(2).replace(/\./g, ",") + ' +IVA');

    //doc.setFontType("normal");
    doc.setFontSize(10);
    doc.text(20, height + 20, 'Note aggiuntive: ');
    splitText = doc.splitTextToSize(offertaHeader.note, 550); //this text could be long so we have to split it in chunks
    doc.text(20, height + 35, splitText);

    noteHeight = splitText.length * 15; //push everything bellow the notes field down according to how many lines its is (lines*15pt)

    doc.setFontType("bolditalic");
    doc.setFontSize(10);
    doc.text(20, height + noteHeight + 70, 'La Sidercampania Professional srl non e\' responsabile per eventuali ritardi di consegna del materiale, dovuta ');
    doc.text(20, height + noteHeight + 85, 'ai nostri fornitori ed il loro ciclo di produzione e trasporto.');
    //doc.text(20, height + noteHeight + 110, 'Validita\' offerta 15gg');

    doc.setFontType("normal");
    doc.text(20, height + noteHeight + 125, 'Nominativo addetto: ' + AGENTI.db.getItem('full_name'));

    var pdfOutput = doc.output();
    //console.log(pdfOutput);

    function pdfSave(name, data, success, fail) {

        var gotFileSystem = function (fileSystem) {

            pdfFilePath = fileSystem.root.nativeURL;

            fileSystem.root.getFile(name, { create: true, exclusive: false }, gotFileEntry, fail);
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        };

        var gotFileWriter = function (writer) {
            writer.onwrite = success;
            writer.onerror = fail;
            writer.write(data);
        };

        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, data.length || 0, gotFileSystem, fail);
    }

    //If pdf file successfully created send Email, else display error
    pdfSave(pdfFileName, pdfOutput, sendEmail, function (error) {
        // handle error
        console.log(error);
        navigator.notification.alert(error);
    });

};

export default createPDF;
