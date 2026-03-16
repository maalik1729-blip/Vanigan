exports.validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

exports.validateBusinessData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push('Business name must be at least 3 characters');
  }

  if (!data.ownerName || data.ownerName.trim().length < 3) {
    errors.push('Owner name must be at least 3 characters');
  }

  if (!data.phone || !exports.validatePhone(data.phone)) {
    errors.push('Invalid phone number');
  }

  if (!data.category) {
    errors.push('Category is required');
  }

  if (!data.address || data.address.trim().length < 10) {
    errors.push('Address must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};
