import { Component, OnInit, Input, HostBinding } from '@angular/core';

/** Services */
import {
    ApplicationService
} from 'app/core';

/** Models */
import {
    CommentCreateDto,
    CommentDto,
    ApplicationDetailDto,
    FieldDto
} from './../../../swagger';

@Component({
    selector: 'pk-comment-add',
    templateUrl: './comment-add.component.html',
    styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent implements OnInit {

    @HostBinding('class.comment-add') add = true;

    @Input() application: ApplicationDetailDto;

    public savingComment: Boolean;
    public addComment: Array<FieldDto>;

    constructor(
        private applicationService: ApplicationService
    ) { }

    ngOnInit() {
        this.initAddCommentForm();
    }

    /**
     * Creates and adds a new comment to the application
     *
     * @param {CommentDto} values
     *
     * @memberOf ApplicationsDetailComponent
     */
    public createNewComment(values: CommentCreateDto): void {
        const comment: CommentCreateDto = new CommentCreateDto(values);

        this.savingComment = true;
        this.applicationService.addCommentToApplication(comment).subscribe((result: CommentDto) => {
            this.application.comments.push(result);
            this.savingComment = false;
            this.initAddCommentForm();
        });
    }

    /**
     * initializes or resets the add comment form
     *
     * @private
     *
     * @memberOf ApplicationsDetailComponent
     */
    private initAddCommentForm(): void {
        this.addComment = [
            {
                fieldType: 'textarea',
                name: 'message',
                label: 'Add Comment:',
                required: true
            },
            {
                fieldType: 'checkbox',
                name: 'isPrivate',
                label: 'Privat',
                styleIds: [
                    'small'
                ]
            }
        ];
    }
}
