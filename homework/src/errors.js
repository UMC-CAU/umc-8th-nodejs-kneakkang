export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MatchToStoreError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateMissionError extends Error {
  errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ExistMissionError extends Error {
  errorCode = "U004";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class CompleteMissionError extends Error {
  errorCode = "U005";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}