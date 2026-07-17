import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';
import Button from '../../../../components/Button/Button';
import { importCedarInstance } from '../../../../lib/componentHelpers/cedarInstanceImport';

/**
 * Prefill the (new) Study Registration form from an uploaded CEDAR template instance.
 * Runs entirely client-side: reads the file, maps it to the form's `formData` shape,
 * and hands the result back to the parent, which drives the existing form-sync logic.
 *
 * @property {Function} onImport - called with { formData, accessLevel, fieldsFilled, format } on success
 * @property {Function} onError - called with a user-readable error string
 */
const CedarInstanceUpload = ({ onImport, onError }) => {
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState('');

    const handleFile = (file) => {
        if (!file) {
            return;
        }
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = importCedarInstance(String(e.target.result), file.name);
                // Detailed, copy-pasteable diagnostics for whoever is debugging an import.
                /* eslint-disable no-console */
                console.groupCollapsed(`[CEDAR import] ${file.name} — ${result.fieldsFilled} field(s) mapped`);
                console.info('format:', result.format);
                console.info('mapped fields:', result.matchedFields);
                console.info('unrecognized keys (ignored):', result.unrecognizedKeys);
                console.info('recognized but empty:', result.emptyMatchedKeys);
                console.info('resulting formData:', result.formData);
                console.groupEnd();
                /* eslint-enable no-console */
                onImport(result);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('[CEDAR import] failed:', err);
                if (onError) {
                    onError(err?.message || 'Could not read that file as a CEDAR instance.');
                }
            }
        };
        reader.onerror = () => {
            if (onError) {
                onError('Could not read the selected file.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
                <Row className="align-items-center">
                    <Col>
                        <div className="fw-semibold mb-1">Prefill from a CEDAR instance (optional)</div>
                        <small className="text-muted">
                            Upload a CEDAR template instance (JSON or YAML) based on the Canopy Study
                            Metadata template to populate the form below. Controlled-vocabulary
                            selections (e.g. Study Domain, Study Design, data types) only pre-select
                            when their values match this hub&apos;s dropdown options — please review
                            those after import.
                        </small>
                    </Col>
                    <Col xs="auto">
                        <input
                            ref={inputRef}
                            type="file"
                            accept=".json,.yaml,.yml,application/json,text/yaml"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                handleFile(e.target.files?.[0]);
                                // reset so selecting the same file again re-triggers onChange
                                e.target.value = '';
                            }}
                        />
                        <Button
                            label="Upload CEDAR instance"
                            iconLeft={<Upload />}
                            ariaLabel="Upload a CEDAR instance to prefill the form"
                            size="auto"
                            variant="secondary"
                            handleClick={() => inputRef.current?.click()}
                        />
                    </Col>
                </Row>
                {fileName && (
                    <Row className="mt-2">
                        <Col>
                            <small className="text-muted">Last imported: {fileName}</small>
                        </Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
};

CedarInstanceUpload.propTypes = {
    onError: PropTypes.func,
    onImport: PropTypes.func.isRequired,
};

export default CedarInstanceUpload;
