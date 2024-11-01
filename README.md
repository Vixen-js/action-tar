# Vixen archive tool for GitHub Actions

## Usage

```
steps:
      - uses: actions/checkout@master
      
      - name: To Compress files
        uses: @vixen-js/action-tar
        id: compress
        with:
          command: compress
          cwd: ./my-folder
          files: |
            ./file1.test
          outPath: my-archive.tar.gz

      - name: To Extract files
        uses: @vixen-js/action-tar
        id: extract
        with:
          command: extract
          cwd: ./path-to-extract
          files: my-archive.tar.gz
```