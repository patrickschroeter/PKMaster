/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Component, OnInit, Input, HostBinding } from '@angular/core';

/** Services */
import {
    ApplicationService
} from 'app/core';

import { TranslationService } from 'app/modules/translation';

/** Models */
import {
    CommentCreateDto,
    CommentDto,
    ApplicationDetailDto,
    FieldDto
} from 'app/swagger';

/**
 * CommentAddComponent
 *
 * @export
 * @class CommentAddComponent
 * @implements {OnInit}
 */
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

    /**
     * Creates an instance of CommentAddComponent.
     * @param {ApplicationService} applicationService
     * @param {TranslationService} translationService
     *
     * @memberOf CommentAddComponent
     */
    constructor(
        private applicationService: ApplicationService,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf CommentAddComponent
     */
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
                label: this.translationService.translate('addComment'),
                required: true
            },
            {
                fieldType: 'checkbox',
                name: 'isPrivate',
                label: this.translationService.translate('privat'),
                styleIds: [
                    'small'
                ]
            }
        ];
    }
}
