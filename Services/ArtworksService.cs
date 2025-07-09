namespace Services;

using Database;
using Database.Models;
using Services.DTOs.Artworks;
using Services.DTOs.Images;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

public class ArtworksService
{
    private readonly Context _context;

    public ArtworksService(Context context)
    {
        _context = context;
    }

    public async Task<ArtworkDTO> CreateAsync(CreateArtworkDTO input)
    {
        var artwork = new Artwork
        {
            Id = Guid.NewGuid().ToString(),
            Title = input.Title,
            Description = input.Description,
            Price = input.Price,
            SizesJSON = JsonSerializer.Serialize(input.Sizes),
            CreatedAt = DateTimeOffset.UtcNow,
        };

        await _context.Artworks.AddAsync(artwork);
        await _context.SaveChangesAsync();

        return MapToArtworkDTO(artwork);
    }

    public async Task DeleteAsync(string id)
    {
        var artwork = await _context.Artworks.FindAsync(id);

        if (artwork == null)
        {
            throw new Exception("Artwork not found.");
        }

        _context.Artworks.Remove(artwork);

        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(string id)
    {
        return await _context.Artworks.AnyAsync(x => x.Id == id);
    }

    public async Task<ArtworkDTO[]> GetAllAsync()
    {
        var artworks = await _context.Artworks.Include(x => x.Images).ToListAsync();

        return artworks.Select(x => MapToArtworkDTO(x)).ToArray();
    }

    public async Task<ArtworkDTO> GetAsync(string id)
    {
        var artwork = await _context.Artworks.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);

        if (artwork == null) throw new Exception("Artwork not found.");

        artwork.Images = [.. artwork.Images.OrderBy(x => x.DisplayOrder)];

        return MapToArtworkDetailsDTO(artwork);
    }

    public async Task<ArtworkDTO[]> GetRandomAsync(int count)
    {
        var artworksCount = await _context.Artworks.CountAsync();

        if (artworksCount < count)
        {
            throw new Exception("The count of random artworks should be greater or equal to the artworks.");
        }
        
        var random = new Random();
        var randomIndexes = Enumerable
            .Range(0, artworksCount)
            .OrderBy(x => random.Next())
            .Take(count)
            .ToList();

        var randomArtworks = new List<ArtworkDTO>();

        foreach(var index in randomIndexes)
        {
            var artwork = await _context.Artworks.Include(x => x.Images).Skip(index).FirstOrDefaultAsync();

            randomArtworks.Add(MapToArtworkDTO(artwork!));
        }

        return randomArtworks.ToArray();
    }

    public async Task<ArtworkDTO> UpdateAsync(UpdateArtworkDTO input)
    {
        var artwork = await _context.Artworks.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == input.Id);

        if (artwork == null)
        {
            throw new Exception("Artwork not found.");
        }

        artwork.Title = input.Title;
        artwork.Description = input.Description;
        artwork.Price = input.Price;
        artwork.SizesJSON = JsonSerializer.Serialize(input.Sizes);
        artwork.ModifiedAt = DateTimeOffset.UtcNow;

        await _context.SaveChangesAsync();

        return MapToArtworkDTO(artwork);
    }

    private static ArtworkDTO MapToArtworkDetailsDTO(Artwork artwork)
    {
        var artworkDetailsDTO = new ArtworkDTO
        {
            Id = artwork.Id,
            Title = artwork.Title,
            Description = artwork.Description,
            Price = artwork.Price,
            Sizes = JsonSerializer.Deserialize<List<SizeDTO>>(artwork.SizesJSON)!
        };

        for (int i = 0; i < artwork.Images.Count; i++)
        {
            var image = artwork.Images[i];
            artworkDetailsDTO.Images.Add(new ImageDTO
            {
                ImageId = image.Id,
                ArtworkId = image.ArtworkId,
                ImageData = image.ImageData,
                DisplayOrder = image.DisplayOrder
            });
        }

        return artworkDetailsDTO;
    }

    private static ArtworkDTO MapToArtworkDTO(Artwork artwork)
    {
        var artworkDetailsDTO = new ArtworkDTO
        {
            Id = artwork.Id,
            Title = artwork.Title,
            Description = artwork.Description,
            Price = artwork.Price,
            Sizes = JsonSerializer.Deserialize<List<SizeDTO>>(artwork.SizesJSON)!
        };

        var image = artwork.Images.FirstOrDefault(x => x.DisplayOrder == 0);

        if (image != null)
        {
            artworkDetailsDTO.Images.Add(new ImageDTO
            {
                ImageId = image.Id,
                ArtworkId = image.ArtworkId,
                ImageData = image.ImageData,
                DisplayOrder = image.DisplayOrder
            });
        }

        return artworkDetailsDTO;
    }
}