---
name: Production Checklist
about: List of items to check before production sign-off.
title: ''
labels: ''
assignees: ''

---
### Quarto Converter

- [ ] rename files to u1.docx <- affects asssets folder path
- [ ] convert werd to .qmd

### GitHub

- [ ] create github repo by:
  - [ ]  cloning '[quarto-template](https://github.com/TWUOnline/quarto-template)' repo OR
  - [ ]  transferring course repo from department organization 
    - [ ]  create release to archive bookdown or previous version
    - [ ]  create new branch for quarto version
- [ ] ensure repo is 'internal'
- [ ] replace unit qmd files in template with copies of generated files
- [ ] files to copy from quarto-template repo if not present
  - [ ] [_quarto.yml](https://github.com/cmadland/quarto-template/blob/99d9bb00b9511ec81af6dc1402708ff054ebe302/_quarto.yml)
  - [ ] [yml-assets](https://github.com/cmadland/quarto-template/blob/99d9bb00b9511ec81af6dc1402708ff054ebe302/yml-assets)
  - [ ] [index.qmd](https://github.com/cmadland/quarto-template/blob/f81218f81a76d16d63e360bacbf8bf5c0ad48755/index.qmd) 
  - [ ] [u1.qmd](https://github.com/cmadland/quarto-template/blob/7ff75298b5fd76601ee9ef1a0537651355278ae3/u1.qmd)
- [ ] 

### Zotero
- [ ] load references into shared TWU-Online library in course folder
- [ ] push references onto course-materials
- [ ] embed citekeys in qmd files
- [ ] check with SME for missing or ambiguous references
- [ ] connect with Library contact for any missing or ambiguous references

### Media

- [ ] check for media requests
- [ ] 

### Moodle

- [ ] new site in appropriate category 
- [ ] ensure Course Format is 'Custom sections'

### External hyperlinks in `_blank`

- [ ] Moodle
- [ ] embedded content

### Hyperlinks are live
- [ ] Moodle
- [ ] embedded content

### Gradebook
- [ ] Check 'Course Grade Settings'
  - [ ] hide all fields except 'Grades' and 'feedback'

