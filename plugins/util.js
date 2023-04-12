export default {
    computed: {
        $rules() {
            return {
                required(e) {
                    return !!e || 'Required'
                },
                email(value = '') {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
                acceptPdfOnly(v) {
                    return v
                        ? v.type && v.type.includes("pdf")
                            ? true
                            : "Use pdf file only."
                        : true;
                },
                acceptImageOnly(value) {
                    if (!value) {
                        return true; // Required validation is handled by the "required" prop
                    }
                    const fileType = value.type;
                    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    return validImageTypes.includes(fileType) || 'Please select a valid image file';
                },
                limitAttachmentTo10(attachments = [], length = 0) {
                    if (
                        attachments &&
                        attachments.length + length >= 10
                    ) {
                        return "Limit attachment to 10 items.";
                    } else if (attachments && attachments.length) {
                        let size = attachments.filter((i) => i.size > 10000000),
                            notPdf = attachments.filter((i) => i.type !== "application/pdf");

                        if (notPdf.length) {
                            return notPdf.length ? "Invalid file format, select PDF only." : true;
                        }

                        size = size && size.length ? size.map((i) => i.name) : [];
                        return size.length ? `${size} exceeded 10MB.` : true;
                    } else {
                        return true;
                    }
                },
                fileSize50Mb(v) {
                    return v
                        ? v && v.size <= 50000000
                            ? true
                            : "File Exceeds 50mb"
                        : true;
                },
                fileSize10Mb(v) {
                    return v
                        ? v && v.size <= 10000000
                            ? true
                            : "File Exceeds 10mb"
                        : true;
                },
                fileSize5Mb(v) {
                    return v ? (v && v.size <= 5000000 ? true : "File Exceeds 5mb") : true;
                },
                fileSize3Mb(v) {
                    return v ? (v && v.size <= 3000000 ? true : "File Exceeds 3mb") : true;
                },
            }
        }
    }
}