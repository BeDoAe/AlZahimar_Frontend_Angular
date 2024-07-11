import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToDoListDto } from '../../models/ToDoList/to-do-list-dto';
import { ToDoListService } from '../../services/ToDoListServices/to-do-list.service';
import { Subject, debounceTime } from 'rxjs';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-sticky-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticky-notes.component.html',
  styleUrl: './sticky-notes.component.css'
})
export class StickyNotesComponent implements OnInit {
  notes: ToDoListDto[] = [];
  private updateSubject: Subject<{ index: number, event: any }> = new Subject();

  constructor(private toDoListService: ToDoListService) {
    this.updateSubject.pipe(
      debounceTime(500) // Adjust the debounce time as needed
    ).subscribe(({ index, event }) => {
      this.performUpdate(index, event);
    });
  }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.toDoListService.getAll().subscribe(response => {
      if (response.isSuccess) {
        this.notes = response.data;
      }
    });
  }

  addNote() {
    const newNote: ToDoListDto = { name: 'New Name', description: 'New Description' };
    this.toDoListService.add(newNote).subscribe(response => {
      if (response.isSuccess) {
        this.notes.push(response.data);
      }
    });
  }

  updateNote(index: number, event: any) {
    this.updateSubject.next({ index, event });
  }

  performUpdate(index: number, event: any) {
    const noteName = event.target.querySelector('h2').textContent;
    const noteDescription = event.target.querySelector('p').textContent;
    const updatedNote: ToDoListDto = { name: noteName, description: noteDescription };
    const noteId = this.notes[index].id;

    this.toDoListService.edit(noteId!, updatedNote).subscribe(response => {
      if (response.isSuccess) {
        this.notes[index] = response.data;
      }
    });
  }

  deleteNote(index: number) {
    const noteId = this.notes[index].id;
    this.toDoListService.delete(noteId!).subscribe(response => {
      if (response.isSuccess) {
        this.notes.splice(index, 1);
      }
    });
  }

  markAsDone(note: ToDoListDto) {
    this.toDoListService.markDone(note.id!).subscribe(response => {
      if (response.isSuccess) {
        note.statusName = 'Done';
      } else {
        console.log(response.data); // Handle the error message appropriately
      }
    });
  }

  downloadNoteAsPDF(note: ToDoListDto) {
    const doc = new jsPDF();
    doc.text(`Name: ${note.name}`, 10, 10);
    doc.text(`Description: ${note.description}`, 10, 20);
    doc.save(`${note.name}.pdf`);
  }
}
