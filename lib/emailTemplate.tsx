export function emailTemplate(title: string, htmlContent: string) {
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          img {
            max-width: 100% !important;
            height: auto !important;
            display: block;
          }
        </style>
      </head>
      <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: var(--color-white);">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: var(--color-white); padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: var(--color-white); padding: 20px; border-radius: 8px;">
                <tr>
                  <td>
                    <h1 style="font-size: 20px; color: var(--color-black);">${title}</h1>
                    <div style="font-size: 16px; line-height: 1.5; color: var(--color-black); max-width: 100%; overflow-wrap: break-word;">
                      ${htmlContent}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; font-size: 12px; color: var(--color-grayAO); text-align: center;">
                    © ${new Date().getFullYear()} <a style="color: var(--color-grayAO)" href="https://limaudio.ru">Limaudio</a>. Все права защищены.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
}
