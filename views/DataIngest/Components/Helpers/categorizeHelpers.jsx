export const canProceed = (childFileTypes, fileTypes, unassignedFiles) => {
    const childTypes = childFileTypes.map((item) => item.name);
    const dataTypes = fileTypes?.data.map((item) => item.name);
    const docTypes = fileTypes?.document.map(item => item.name);
    const uncategorized = unassignedFiles.filter(
        (file) => file.category === 'Uncategorized' || childTypes.includes(file.category) || dataTypes.includes(file.category) || docTypes.includes(file.category)
    );
    return uncategorized.length > 0;
};

export const handleAddChild = (newId, row, bundleFiles, unassignedFiles, setUnassignedFiles, setBundleFiles, setSelectUnassignedFile) => {
    const bundles = [...bundleFiles];
    const unassigned = [...unassignedFiles];
    const newUnassigned = unassigned.filter((file) => file.id !== parseInt(newId));
    const fileToAdd = unassigned.filter((file) => file.id === parseInt(newId));
    setUnassignedFiles([...newUnassigned]);
    for (const item of bundles) {
        /* eslint-disable-next-line react/prop-types */
        const index = item.childFiles.findIndex((child) => child.id === row.original.id);
        if (index > -1) {
            item.childFiles[index] = fileToAdd[0];
        }
    }
    setBundleFiles([...bundles]);
    setSelectUnassignedFile({});
};
