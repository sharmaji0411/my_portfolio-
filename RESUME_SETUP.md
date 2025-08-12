# 📄 Resume Setup Guide

## Quick Setup

1. **Save your resume as**: `Vansh_Sharma_Resume.pdf`
2. **Place it in**: `client/public/assets/documents/`
3. **Done!** The download button will work automatically.

## Detailed Instructions

### Step 1: Prepare Your Resume
- Format: PDF only
- Filename: `Vansh_Sharma_Resume.pdf` (exact, case-sensitive)
- Size: Under 5MB recommended
- Content: Make sure it's your latest version

### Step 2: Add to Project
```bash
# Navigate to your project folder
cd your-portfolio-project

# Place your resume in the correct location
# Copy your resume file to: client/public/assets/documents/Vansh_Sharma_Resume.pdf
```

### Step 3: Test the Download
1. Start your server: `npm run dev` or `python3 run_python.py`
2. Go to your portfolio website
3. Click the "Download Resume" button in the hero section
4. Your resume should download with a success toast notification

## Alternative Methods

### Method 1: External Hosting (Google Drive, Dropbox)
If you prefer to host your resume externally:

1. Upload your resume to Google Drive, Dropbox, or similar
2. Get a direct download link
3. Edit `client/src/components/hero-section.tsx`
4. Update the `link.href` in the `downloadResume` function:

```javascript
const downloadResume = () => {
  const link = document.createElement('a');
  link.href = 'https://your-external-link.com/resume.pdf';
  link.download = 'Vansh_Sharma_Resume.pdf';
  link.target = '_blank';
  link.click();
  
  toast({
    title: "Resume Downloaded",
    description: "Vansh Sharma's resume has been downloaded successfully.",
  });
};
```

### Method 2: Multiple Resume Versions
To offer different resume versions (general, tech-focused, etc.):

1. Create multiple resume files:
   - `Vansh_Sharma_Resume_General.pdf`
   - `Vansh_Sharma_Resume_Tech.pdf`
   - `Vansh_Sharma_Resume_DataScience.pdf`

2. Add dropdown selection in the hero section:
```tsx
const [resumeType, setResumeType] = useState('general');

const downloadResume = (type = resumeType) => {
  const link = document.createElement('a');
  link.href = `/assets/documents/Vansh_Sharma_Resume_${type}.pdf`;
  link.download = `Vansh_Sharma_Resume_${type}.pdf`;
  // ... rest of the function
};
```

## User Experience Features

The download button includes:
- ✅ **File existence check** - Verifies resume exists before download
- ✅ **Success notification** - Toast message confirms successful download
- ✅ **Error handling** - Friendly messages if file is unavailable
- ✅ **Automatic download** - No need to right-click and save
- ✅ **Professional filename** - Downloads with proper name

## Troubleshooting

### "Resume Unavailable" Message
**Cause**: Resume file not found
**Solution**: 
- Check filename is exactly `Vansh_Sharma_Resume.pdf`
- Verify file is in `client/public/assets/documents/`
- Restart your development server

### Download Doesn't Start
**Cause**: Browser blocking download or file path issue
**Solution**:
- Check browser popup blocker settings
- Try in incognito/private browsing mode
- Verify file permissions (should be readable)

### Wrong File Downloads
**Cause**: Browser cache or old file
**Solution**:
- Clear browser cache
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Replace the old resume file completely

## File Structure
```
your-portfolio/
├── client/
│   ├── public/
│   │   └── assets/
│   │       └── documents/
│   │           ├── README.md
│   │           └── Vansh_Sharma_Resume.pdf  ← Your resume goes here
│   └── src/
│       └── components/
│           └── hero-section.tsx  ← Contains download logic
└── README.md
```

## Security Notes
- Resume files are publicly accessible (anyone with the link can download)
- Don't include sensitive personal information like full address or SSN
- Keep multiple versions if you need different levels of detail
- Regular updates ensure the latest version is always available

## Next Steps
After adding your resume:
1. Test the download functionality
2. Share your portfolio link with confidence
3. Update your resume regularly by replacing the file
4. Consider adding a "Last Updated" date to your resume

Your portfolio visitors can now easily download your resume with a professional, smooth experience!