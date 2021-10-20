
export const mutationObserver = (idNode, callback) => {
    const mutation = new MutationObserver(mutationRecords => {
        if(mutationRecords && mutationRecords.length) return callback();
    });

    return mutation.observe(idNode, {
        childList: true,
        subtree: true,
    })
}