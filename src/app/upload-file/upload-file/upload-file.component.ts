import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  progress!:string
  files!: Set<File>


  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, 'http://localhost:8080/upload')
      .subscribe(r => console.log('Upload concluido'))
    }
  }
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
    //criando o conjunt para os arquivos
    this.files = new Set()

    for(let i = 0; i < input.files.length; i++){
      fileNames.push(input.files[i].name)
      this.files.add(input.files[i])
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
