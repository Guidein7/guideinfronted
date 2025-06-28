import axios from "axios"
import { resources } from "../../resources"

export const DownloadTemplate = (type) => {
    axios.get(`${resources.APPLICATION_URL}video-excel-template?type=${type}`, {
      responseType: 'blob', 
    })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      const disposition = response.headers['content-disposition'];
      let fileName = `${type}.xlsx`;
      if (disposition && disposition.includes('filename=')) {
        const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (match?.[1]) {
          fileName = match[1].replace(/['"]/g, '');
        }
      }
  
     
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => {
      console.error("Download error:", err);
    });
  };


  export const handleAdd = (setIsopen) => {
     return setIsopen(true)
  }