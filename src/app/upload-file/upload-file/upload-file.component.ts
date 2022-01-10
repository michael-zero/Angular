import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  progress!:string
  files!:boolean

  constructor() { }

  ngOnInit(): void {
  }

  onUpload(){}
  onDownloadExcel(){}
  onDownloadPDF(){}

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
        return;
    }

    console.log(input.files)

    // const file = input.files[0];
    const fileNames = []

    for(let i = 0; i < input.files.length; i++){
      fileNames.push(input.files[i].name)
    }

    //setando os nomes dos arquivos selecionados na pagina
    // const ref = document.getElementById('customFileLabel')

    const ref = document.getElementById('customFileLabel')
    if(!ref){
      return
    }

    // ref.innerHTML = file.name
    ref.innerHTML = fileNames.join(', ')
 }

}
