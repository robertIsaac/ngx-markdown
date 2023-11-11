import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguagePipe, MarkdownComponent, MarkdownPipe } from 'ngx-markdown';
import { ScrollspyNavLayoutComponent } from '../shared/scrollspy-nav-layout/scrollspy-nav-layout.component';
import { HttpRawLoaderService } from '@shared/http-raw-loader';

@Component({
  selector: 'app-bindings',
  templateUrl: './bindings.component.html',
  styleUrls: ['./bindings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ScrollspyNavLayoutComponent,
    MarkdownComponent,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    LanguagePipe,
    MarkdownPipe,
    AsyncPipe,
  ],
})
export class BindingsComponent implements OnInit {

  // remote url
  demoPython$ = this.rawLoaderService.get('app/bindings/remote/demo.py');

  // variable-binding
  markdown =
`### Markdown example
---
This is an **example** where we bind a variable to the \`markdown\` component that is also bound to a textarea.

#### example.component.ts
\`\`\`typescript
public markdown = "# Markdown";
\`\`\`

#### example.component.html
\`\`\`html
<textarea [(ngModel)]="markdown"></textarea>
<markdown [data]="markdown"></markdown>
\`\`\``;

  // pipe
  typescriptMarkdown =
`import { Component } from '@angular/core';

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.scss'],
})
export class MarkdownDemoComponent {
  public pipeMarkdown = '# Markdown';
}`;

  headings: Element[] | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private rawLoaderService: HttpRawLoaderService,
  ) { }

  ngOnInit(): void {
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
