import { PkPage } from './app.po';

describe('pk App', function () {
    let page: PkPage;

    beforeEach(() => {
        page = new PkPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
