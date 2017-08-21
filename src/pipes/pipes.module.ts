import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './../pipes/sanitize-html/sanitize-html';
import { MarkdownToHtmlPipe } from './../pipes/markdown-to-html/markdown-to-html';
@NgModule({
	declarations: [
    SanitizeHtmlPipe,
    MarkdownToHtmlPipe,
  ],
	imports: [],
	exports: [
    SanitizeHtmlPipe,
    MarkdownToHtmlPipe,
  ]
})
export class PipesModule {}
