using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Hospitals
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Hospital Hospital { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Hospital).SetValidator(new HospitalValidator());
            }
        }        

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;                
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var hospital = await _context.Hospitals.FindAsync(request.Hospital.Id);

                if(hospital == null) return null;

                _mapper.Map(request.Hospital, hospital);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update hospital");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}