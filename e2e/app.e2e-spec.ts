import { RedirectManagementPage } from './app.po';

describe('redirect-management App', () => {
  let page: RedirectManagementPage;

  beforeEach(() => {
    page = new RedirectManagementPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
