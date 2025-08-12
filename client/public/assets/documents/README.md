# Resume Storage

## How to Add Your Resume

1. **Save your resume as a PDF** with the exact filename: `Vansh_Sharma_Resume.pdf`

2. **Place the PDF file in this directory**: `client/public/assets/documents/`

3. **File structure should look like this**:
   ```
   client/public/assets/documents/
   ├── README.md (this file)
   └── Vansh_Sharma_Resume.pdf (your resume)
   ```

4. **That's it!** The download button will automatically work with your resume.

## Important Notes

- **Filename must be exact**: `Vansh_Sharma_Resume.pdf` (case-sensitive)
- **File format**: PDF only
- **File size**: Keep under 5MB for fast downloads
- **Updates**: Simply replace the file to update your resume

## Testing the Download

After adding your resume file:

1. Start your development server: `npm run dev`
2. Go to your portfolio website
3. Click the "Download Resume" button in the hero section
4. Your resume should download automatically

## Troubleshooting

**Button doesn't work?**
- Check the filename is exactly `Vansh_Sharma_Resume.pdf`
- Make sure the file is in the correct directory
- Refresh your browser and try again

**File not found error?**
- The system will show a friendly message if the resume isn't found
- Double-check the file location and name

## Alternative: Custom Resume URL

If you prefer to host your resume elsewhere (Google Drive, Dropbox, etc.):

1. Get a direct download link to your PDF
2. Edit `client/src/components/hero-section.tsx`
3. Replace the `link.href` with your custom URL

Example:
```javascript
link.href = 'https://drive.google.com/file/d/your-file-id/view?usp=drive_link';
```