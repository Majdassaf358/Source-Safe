import { Component, OnInit } from '@angular/core';

interface Difference {
  type: string;
  line: number;
  old_content?: string;
  new_content?: string;
  changes?: {
      old_highlighted: string;
      new_highlighted: string;
  };
  content?: string;
}

interface ResponseData {
  status: boolean;
  message: string;
  data: {
      headers: object;
      original: {
          success: boolean;
          diffrence: Difference[];
      };
      exception: any;
  };
}
@Component({
  selector: 'app-file-changes',
  standalone: true,
  imports: [],
  templateUrl: './file-changes.component.html',
  styleUrl: './file-changes.component.css'
})
export class FileChangesComponent implements OnInit  {

  response: ResponseData = {
    status: true,
    message: "You've compared the files successfully",
    data: {
        headers: {},
        original: {
            success: true,
            diffrence: [
                { type: 'modified', line: 1, old_content: 'First file will count to 10', new_content: 'Second file will write from a to g', changes: { old_highlighted: 'First file will count to 10', new_highlighted: 'Second file will write from a to g' } },
                { type: 'modified', line: 2, old_content: '1', new_content: 'A', changes: { old_highlighted: '1', new_highlighted: 'A' } },
                { type: 'modified', line: 4, old_content: '3', new_content: 'C', changes: { old_highlighted: '3', new_highlighted: 'C' } },
                { type: 'modified', line: 5, old_content: '4', new_content: 'D', changes: { old_highlighted: '4', new_highlighted: 'D' } },
                { type: 'modified', line: 6, old_content: '5', new_content: 'E', changes: { old_highlighted: '5', new_highlighted: 'E' } },
                { type: 'modified', line: 7, old_content: '6', new_content: 'F', changes: { old_highlighted: '6', new_highlighted: 'F' } },
                { type: 'modified', line: 8, old_content: '7', new_content: 'G', changes: { old_highlighted: '7', new_highlighted: 'G' } },
                { type: 'removed', line: 9, content: '8' },
                { type: 'removed', line: 10, content: '9' },
                { type: 'removed', line: 11, content: '10' }
            ]
        },
        exception: null
    }
};

ngOnInit(): void {
    this.displayResponse();
}

displayResponse(): void {
    const statusMessage = document.getElementById('status-message');
    if (statusMessage) {
        statusMessage.innerText = this.response.message;
    }

    const tableBody = document.getElementById('response-table');
    if (tableBody) {
        this.response.data.original.diffrence.forEach(dif => {
            const row = document.createElement('tr');

            const typeCell = document.createElement('td');
            typeCell.innerText = dif.type;
            row.appendChild(typeCell);

            const lineCell = document.createElement('td');
            lineCell.innerText = dif.line.toString();
            row.appendChild(lineCell);

            const oldContentCell = document.createElement('td');
            oldContentCell.innerHTML = dif.old_content ? `<span class="highlight">${dif.old_content}</span>` : '';
            row.appendChild(oldContentCell);

            const newContentCell = document.createElement('td');
            newContentCell.innerHTML = dif.new_content ? `<span class="highlight">${dif.new_content}</span>` : '';
            row.appendChild(newContentCell);

            tableBody.appendChild(row);
        });
    }
}
}
