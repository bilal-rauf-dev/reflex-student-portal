# Assets

Images used by the README and the documentation.

```
docs/assets/
  logo.png              ReFlex wordmark
  screens/              Product screenshots, numbered in reading order
    01-login.png
    02-dashboard.png
    03-attendance.png
    ...
```

## Adding screenshots

1. Export at **2x**, PNG, and compress before committing. Nothing over 2MB.
2. Name with a leading number so the folder stays in reading order: `04-marks.png`.
3. Link it in the README with an explicit width so it renders sensibly on GitHub:

```markdown
<img src="docs/assets/screens/04-marks.png" alt="Grade projection screen" width="820" />
```

4. Always write real alt text. This project fails an accessibility audit in its own README otherwise.

## Before you commit an image

If the image shows the **live Flex portal** rather than ReFlex, every field listed in
[DATA_AND_PRIVACY.md](../DATA_AND_PRIVACY.md) must be blacked out first: CNIC, date of birth, phone
numbers, addresses, family member names and the family CNIC column, challan and instrument numbers,
and email addresses.
