export const styles = {
    content: {
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: '1rem'
    },
    header: {
        height: '5rem',
        backgroundColor: "#1f3b8d",
        padding: "0 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: '0 1rem 0 0rem'
    },
    title: {
        color: 'info.main'
    },
    main: {
        flex: 1
    },
    link: {
        color: "#1f3b8d",
        margin: "0.5rem",
        cursor: "pointer",
        fontSize: "1rem",
        ':hover': {
            textDecoration: "underline"
        }
    },
    text: {
        margin: "1rem 0"
    },
    footer: {
        padding: "1rem"
    }
}