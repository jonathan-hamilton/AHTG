// using Domain;
// using FluentValidation;

// public class HospitalValidator : AbstractValidator<Hospital>
// {
//     public HospitalValidator()
//     {
//         RuleFor(x => x.Name).NotEmpty();
//         RuleFor(x => x.Address).NotEmpty();
//         RuleFor(x => x.City).NotEmpty();
//         RuleFor(x => x.State).NotEmpty();
//         RuleFor(x => x.Zip).NotEmpty();
//         RuleFor(x => x.Email).NotEmpty();
//         RuleFor(x => x.Phone).NotEmpty();
//         RuleFor(x => x.Specialty).NotEmpty();
//         RuleFor(x => x.Description).NotEmpty();
//     }
// }