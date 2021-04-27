import React from 'react';
import ContractorJobAttachmentsWrapper from './JobAttachments.style';
import Button from '@iso/components/uielements/button';
import Icon from '@iso/components/icons/Icon';import MultiplyIcon from '@iso/components/icons/Multiply';
import filesize from 'filesize.js';
import PdfImg from '@iso/assets/images/pdf.svg';

const ContractorJobAttachments = ({ attachments, onDelete }) => {
  return (
    <ContractorJobAttachmentsWrapper>
      {attachments.map((attachment) => (
        <div className="attachmentBox" key={`attachment-${attachment.id}`}>
          <div className="attachmentDetails">
            <Icon image={PdfImg} width={16} height={20} />
            <a href={attachment.path} target="_blank" className="attachmentTitle" title={attachment.name}>
              {attachment.name}
            </a>
            <span>({filesize(attachment.size)})</span>
          </div>
          {onDelete && (
            <Button type="link" className="removeBtn" onClick={() => onDelete(attachment)}><MultiplyIcon width={14} height={14} /></Button>
          )}
        </div>
      ))}
    </ContractorJobAttachmentsWrapper>
  );
};

export default ContractorJobAttachments;
